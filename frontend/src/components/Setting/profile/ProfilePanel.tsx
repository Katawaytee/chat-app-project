import { Avatar } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { UserInfo } from "../../../lib/type/UserHidden";
import TextInput from "../../Form/TextInput";
import { storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const schema = z.object({
    displayName: z.string().trim().min(1, {message: 'Fill display name'})
})

type ValidationSchemaType = z.infer<typeof schema>;

export default function ProfilePanel({currentUser,fetchUser} : {currentUser : UserInfo,fetchUser : () => Promise<boolean>}){
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
        resolver: zodResolver(schema),
    });

    const avatarRef = useRef<HTMLInputElement>(null);
    const [showAvatarWarning, setShowAvatarWarning] = useState<boolean>(false)
    const [avatarLink, setAvatarLink] = useState<string>(currentUser.imageURL)
    const [disableUpload, setDisableUpload] = useState<boolean>(false)

    const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
        
        await fetchUser();
        if (!currentUser) {
            return;
        }

        const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/user",{
            method : "PUT",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({...data, imageURL: avatarLink})
        })

        if (result.ok) {
            const data = await result.json();
            console.log(data);
            await fetchUser();
            document.location = '/settings/profile'
        }

    }

    function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
        
        setDisableUpload(true)
        
        if (e.target.files) {
            const file = e.target.files[0]

            if (!file) {
                setDisableUpload(false)
                return
            }

            const storageRef = ref(storage, `avatars/${(new Date()).getTime()}-${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed",
                (snapshot) => {
                    console.log(`Progress: ${Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)}`)
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setAvatarLink(downloadURL)
                        setShowAvatarWarning(true)
                    });
                }
            );  
        }

        setDisableUpload(false)

    }

    function removeAvatar() {
        setAvatarLink("https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png")
        if (avatarRef.current) {
            avatarRef.current.value = ""
        }
        setShowAvatarWarning(true)
    }

    function handleAvatarCilck() {
        if (avatarRef?.current) {
            avatarRef.current.click()
        }
    }
    
    return (    
        
        <div className="flex flex-col w-full">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Public Profile</div>
            
            <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >  
                
                <div className="flex flex-col gap-y-2 w-full items-start gap-3 pb-3 pt-3">
                    <span className="font-semibold text-sm">Avatar</span>
                    <div className="w-full flex flex-col md:flex-row md:pl-5 justify-start items-center gap-5">
                        <Avatar className = "block justify-center " src={avatarLink} sx={{width : 100, height : 100}}/>
                        {
                            disableUpload ? (
                                <>
                                    <button className="disabled-button w-fit h-fit" type="button" disabled>Upload Avatar</button>
                                    <button className="disabled-button w-fit h-fit" type="button" disabled>Remove Image</button>
                                </>                                            
                            ) : (
                                <>
                                    <button className="primary-button w-fit h-fit" type="button" onClick={handleAvatarCilck}>Upload Avatar</button>
                                    <button className="bordered-button w-fit h-fit" type="button" onClick={removeAvatar}>Remove Image</button>
                                </> 
                            )
                        }
                        <input type="file" accept=".png, .jpg, .jpeg" hidden ref={avatarRef} onChange={uploadAvatar} />
                    </div>
                    {
                        showAvatarWarning && <span className="text-sm">Don't forget to save profile to update avatar</span>
                    }
                    
                </div>

                <div className="flex flex-col gap-y-2 w-full">
                    <TextInput 
                        type="text" 
                        name="displayName" 
                        fieldName="Display Name" 
                        placeholder="Display Name..." 
                        register={register} 
                        error={errors.displayName} 
                    />
                    <button className="primary-button w-fit" type="submit">Save Profile</button>
                </div>
            
            </form>

        </div>

    );
}