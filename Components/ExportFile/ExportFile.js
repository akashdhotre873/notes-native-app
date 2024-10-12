// import FileSystem from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getUUID } from '../../helpers/cryptographyHelper';
import { useState } from 'react';

const { StorageAccessFramework } = FileSystem;

const baseUri =
  'content://com.android.externalstorage.documents/tree/primary%3ANotesAppTest';

export const ExportFile = () => {
  const [fileName, setFileName] = useState('');

  const saveFile = async () => {
    const contents = JSON.stringify({ foo: 'bar1' });

    // Requests permissions for external directory
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync(baseUri);

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;

      // Gets all files inside of selected directory
      const files = await StorageAccessFramework.readDirectoryAsync(uri);

      console.log(uri);

      const mimeType = 'json';

      try {
        // const createFileResult = await StorageAccessFramework.createFileAsync(
        //   parentFileDir,
        //   baseFileName,
        //   mimeType
        // );
        // console.log(createFileResult);
        const uuid = getUUID();
        const fileName = uuid + '.' + mimeType;
        const createResult = await StorageAccessFramework.createFileAsync(
          uri,
          fileName,
          mimeType
        );
        setFileName(createResult);
        console.log(createResult);
        const result = await StorageAccessFramework.writeAsStringAsync(
          createResult,
          contents
        );
        console.log(createResult, result);
      } catch (e) {
        console.log(e);
      }
      console.log('done');
    }
  };

  const readFile = async () => {
    console.log('reading');
    const result = await StorageAccessFramework.readAsStringAsync(fileName);
    console.log(result.split('\n')[0]);
  };

  const requestDir = async () => {
    await StorageAccessFramework.requestDirectoryPermissionsAsync(baseUri);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={requestDir} style={styles.requestDirText}>
        <Text>Request</Text>
      </Pressable>

      <Pressable onPress={saveFile}>
        <Text style={styles.exportText}>Export</Text>
      </Pressable>

      <Pressable onPress={readFile} style={styles.readFile}>
        <Text style={styles.exportText}>Read</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  exportText: {
    fontSize: 20,
  },
  readFile: {
    marginVertical: 40,
  },
  requestDirText: {
    marginBottom: 40,
  },
});
