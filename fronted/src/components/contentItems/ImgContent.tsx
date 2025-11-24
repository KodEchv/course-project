export const ImgContent = ({src, alt}: {src:string, alt:string}) => {
  return (
    <div className="my-4 flex justify-center">
      <img src={src} alt={alt} className="max-w-1/2 h-auto rounded-lg" />
    </div>
  )
}
