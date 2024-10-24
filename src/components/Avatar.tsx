import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  showUpload?: boolean;
}

const Avatar = ({ url, size = 150, onUpload, showUpload }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);

      if (error) {
        console.log(error); // Log the error before throwing it
        throw error;
      }

      // Create a blob URL from the data
      const avatarBlobUrl = URL.createObjectURL(data);
      setAvatarUrl(avatarBlobUrl);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
    // Implement the upload logic here
  }

  return (
    <View>
      {avatarUrl ? (
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        </View>
      ) : (
        <View
          style={[avatarSize, styles.avatar, styles.noImage]}
          className="justify-center items-center"
        >
          <ActivityIndicator color="white" />
          {/* Optional: Add fallback text */}
          {/* <Text>No Avatar</Text> */}
        </View>
      )}
      {showUpload && (
        <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
          {!uploading ? (
            <Pressable onPress={uploadAvatar}>
              <MaterialIcons name="cloud-upload" size={30} color="black" />
            </Pressable>
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
    maxWidth: '100%',
    position: 'relative',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 20,
  },
});
