"use client";

import { storage } from "@/lib/firebaseConfig/init";
import { Text, Button } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useRef } from "react";

type Props = {
  onUploadComplete: (url: string) => void;
  fileName: string;
};

const UploadFileField = ({ onUploadComplete, fileName }: Props) => {
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef<any>(null); // Reference to the webcam component

  const onDropFile = (file: FileWithPath[]) => {
    const storageRef = ref(storage, fileName + new Date().getTime() + file[0].name);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setLoading(false);
        // Handle unsuccessful uploads
      },
      () => {
        setLoading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onUploadComplete(downloadURL);
        });
      }
    );
  };

  const captureImage = () => {
    if (webcamRef.current) {
      //@ts-ignore
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const blob = dataURLtoBlob(imageSrc);
        const file = new File([blob], "captured-image.png");
        onDropFile([file]);
      }
    }
  };

  // Function to convert Data URL to Blob
  const dataURLtoBlob = (dataURL: string) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  return (
    <div>
      <Button onClick={captureImage}>Upload Cover Image</Button>
      <Dropzone w="200px" p={6} maxFiles={1} loading={loading} accept={IMAGE_MIME_TYPE} onDrop={onDropFile}>
        <Text ta="center">Upload Image</Text>
      </Dropzone>
    </div>
  );
};

export default UploadFileField;
