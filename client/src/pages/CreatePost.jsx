import { TextInput, Select, FileInput, Button, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setimageUploadProgress] = useState(null);
    const [imageUploadError, setimageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleUploadImage = async() => {
        try {
            if(!file){
                setimageUploadError('Please select an image');
                return;
            }
            setimageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                    const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setimageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setimageUploadError('Image upload failed');
                    setimageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setimageUploadProgress(null);
                        setimageUploadError(null);
                        setFormData({...formData, image: downloadURL});
                    });
                }
            );           

        } catch (error) {
            setimageUploadError('Image upload failed');
            setimageUploadProgress(null);
        }
    }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput
                 type='text'
                 placeholder='Title'
                 required
                 id='title'
                 className='flex-1'
                />
                <Select size="lg">
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">Javascript</option>
                    <option value="reactjs">React.js</option>
                    <option value="next.js">Next.js</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput 
                type='file' 
                accept='image/*' 
                size="lg" 
                onChange={(e) => setFile(e.target.files[0]) }
                />
                <Button 
                type='button' 
                gradientDuoTone="purpleToBlue" 
                size="lg" 
                outline
                onClick={handleUploadImage}
                disabled={imageUploadProgress}
                >
                {
                imageUploadProgress ?
                  <div className='w-16 h-16'>
                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0 }%`} />
                  </div>
                  : 'Upload Image'
                }
                </Button>
            </div>
            {imageUploadError && (
                <Alert color='failure'>
                    {imageUploadError}
                </Alert>
            )}
            {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72 aspect-auto object-center rounded-lg shadow-md'
                    />
            )}
            <ReactQuill theme='snow' placeholder='Write something...' 
            className='h-72 mb-12' 
            required
            />
            <Button type='submit' gradientDuoTone="purpleToPink">
                Publish
            </Button>
        </form>
    </div>
  )
}

export default CreatePost