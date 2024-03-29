import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import CloseIcon from "@material-ui/icons/Close";
import PublicIcon from "@material-ui/icons/Public";
import "./styles/upload_photo_form.css";

import Description from "./Description";
import Photo from "./Photo";
import ZoomSlider from "./ZoomSlider";
import Options from "./Options";
import Footer from "./Footer";

import { useStateValue } from "providers/StateProvider";
import ModalBox from "components/ModalBox";
import firebase from "firebase/app";
import db, { storage } from "firebase.js";

const storageRef = storage.ref("images");

function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

function UploadPhotoForm({ closeAllMenus }) {
  const {
    state: {
      user,
      uploadPhotoForm: {
        imageRef,
        imageContainerRef,
        imageThumbnailRef,
        croppedImageRef,
      },
    },
  } = useStateValue();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [cropped, setCropped] = useState(false);
  const [zoomedHeight, setZoomedHeight] = useState(300);
  const [zoomedWidth, setZoomedWidth] = useState(null);
  const lengthOfThumbnailSide = 300;

  const imageDimensions = {
    height: `${cropped ? { lengthOfThumbnailSide } : zoomedHeight}px`,
    width: `${cropped ? { lengthOfThumbnailSide } : zoomedWidth}px`,
  };

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const ratio =
        (zoomedHeight - imageRef.current.height) / imageRef.current.height + 1;
      setZoomedWidth(imageRef.current.width * ratio);
    }
  }, [imageRef, image, zoomedHeight]);

  const onSave = (e, image) => {
    e.preventDefault();
    const canvas = croppedImageRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = async () => {
      const canvasSizeRatio =
        (zoomedHeight - imageRef.current.naturalHeight) /
        imageRef.current.naturalHeight;
      const destinationX =
        imageThumbnailRef.current.getBoundingClientRect().left -
        imageContainerRef.current.getBoundingClientRect().left;
      const destinationY =
        imageThumbnailRef.current.getBoundingClientRect().top -
        imageContainerRef.current.getBoundingClientRect().top;

      if (Math.sign(canvasSizeRatio) === -1) {
        const newThumbnailLength =
          (lengthOfThumbnailSide / zoomedHeight) *
          imageRef.current.naturalHeight;
        ctx.canvas.width = newThumbnailLength;
        ctx.canvas.height = newThumbnailLength;

        const xAdjustedForZoom =
          (destinationX / zoomedWidth) * imageRef.current.naturalWidth;
        const yAdjustedForZoom =
          (destinationY / zoomedHeight) * imageRef.current.naturalHeight;
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          -xAdjustedForZoom,
          -yAdjustedForZoom,
          img.width,
          img.height
        );
      } else {
        ctx.canvas.width = 300;
        ctx.canvas.height = 300;
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          -destinationX,
          -destinationY,
          zoomedWidth,
          zoomedHeight
        );
      }

      const [fileName, fileExtension] = image.file.name.split(".");

      const fullImageRef = storageRef.child(
        fileName +
          "-" +
          Date.now() +
          "-" +
          getRandomString(6) +
          "." +
          fileExtension
      );

      const thumbnailRef = storageRef.child(
        fileName + "-" + Date.now() + "-" + getRandomString(6) + ".png"
      );

      await fullImageRef.put(image.file);
      await thumbnailRef.put(dataURItoBlob(canvas.toDataURL()));

      const userDoc = db.collection("users").doc(user);

      const newPhotoDoc = userDoc.collection("posts").doc();

      const data = {
        id: newPhotoDoc.id,
        wallId: user,
        userId: user,
        message: description,
        image: fullImageRef.name,
        thumbnail: thumbnailRef.name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        cropped,
        temporary: false,
        type: "Photo",
        subtype: "Profile Photo",
        reactions: {
          like: [],
        },
      };

      await newPhotoDoc.set(data);
      await userDoc.set(
        {
          profilePic: newPhotoDoc.id,
        },
        { merge: true }
      );

      closeAllMenus();
    };

    img.src = image["data_url"];
  };

  return (
    <ImageUploading
      value={image}
      onChange={(imageList) => setImage(imageList)}
      dataURLKey="data_url"
    >
      {({ imageList, onImageUpload, onImageRemove }) => (
        <ModalBox handleClickAway={() => closeAllMenus()}>
          <div className="profilePhoto__modal__container">
            <div className="profilePhoto__modal__header">
              <h3>Update Profile Picture</h3>
              <button
                className="profilePhoto__modal__closeButton"
                onClick={() => closeAllMenus()}
              >
                <CloseIcon />
              </button>
            </div>
            {image.length > 0 && (
              <div className="updatePhoto__body">
                <Description
                  description={description}
                  setDescription={setDescription}
                />
                <Photo
                  imageList={imageList}
                  imageDimensions={imageDimensions}
                  zoomedHeight={zoomedHeight}
                  cropped={cropped}
                />
                <ZoomSlider
                  image={image}
                  zoomedHeight={zoomedHeight}
                  setZoomedHeight={setZoomedHeight}
                />
                <Options cropped={cropped} setCropped={setCropped} />
                <div className="updatePhoto__visibility">
                  <PublicIcon /> Your profile picture is public.
                </div>
              </div>
            )}
            <Footer
              image={image}
              onImageRemove={onImageRemove}
              onSave={onSave}
              onImageUpload={onImageUpload}
            />
          </div>
        </ModalBox>
      )}
    </ImageUploading>
  );
}

export default UploadPhotoForm;
