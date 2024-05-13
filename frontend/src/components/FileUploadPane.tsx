

interface Props {
  setFile: Function;
}

export default function FileUploadPane( {setFile} : Props ) {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (!e.target.files) return
    
    setFile(e.target.files[0])
    
  }
  
  return(

      <input type="file" className="relative m-0 block w-3/4 min-w-0 flex-auto cursor-pointer rounded-md 
        border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] 
        text-surface transition duration-300 ease-in-out 
        file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none 
        file:border-0 file:border-e file:border-solid file:border-inherit file:bg-emerald-500 file:px-3 
        file:py-[0.32rem] file:text-surface file:text-white file:dark:text-white hover:file:bg-emerald-600" 
        onChange={handleOnChange}
      />

  )
}