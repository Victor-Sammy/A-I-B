import React, { useState } from 'react'
import { AiOutlinePlus, AiTwotoneDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import '../../../sass/components/_subCatOpt.scss'
import { client } from '../../../Api/Api'
import { toast } from 'react-toastify'

const Fashion = () => {
  const [selectedImages, setSelectedImages] = useState([])
  const [data, setData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    gender: '',
    size: '',
    sleeveLength: '',
  })
  const [errors, setErrors] = useState({
    selectedImages: '',
  })

  const navigate = useNavigate()

  const handle = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  const onSelectFile = async (e) => {
    // const selectedFiles = []
    // const targetFiles = e.target.files
    // console.log(targetFiles)
    // const targetFilesObject = [...targetFiles]
    // targetFilesObject.map((file) => {
    //   return selectedFiles.push(URL.createObjectURL(file))
    // })
    // setSelectedImages(selectedFiles)
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setSelectedImages((prevImages) => prevImages.concat(imageArray))
      console.log(imageArray)

      const blob = new Blob(imageArray)
      console.log(selectedImages)

      let fileReader = new FileReader()
      fileReader.readAsDataURL(blob)
      fileReader.onload = function (fileLoad) {
        console.log(fileReader.result)
      }
    }

    // const base64s = []
    // for (var i = 0; i < selectedFiles.length; i++) {
    //   var base = await convertBase64(selectedFiles[i])
    //   base64s.push(base)
    // }
    //console.log(base64s)
    //uploadMultipleImages(base64s);
    //const file = newData[0]
    //const base64 = await getbase64(file)
    //console.log(base64)

    // const selectedFilesArray = Array.from(selectedFiles)

    // const imagesArray = selectedFilesArray.map((file) => {
    //   return URL.createObjectURL(file)
    // })
    // setSelectedImages((previousImages) => previousImages.concat(imagesArray))
    // // for bug in chrome
    // e.target.value = ''
  }

  const submitData = async (e) => {
    e.preventDefault()
    console.log(selectedImages)

    const storeID = localStorage.getItem('store-id')
    const categoryID = localStorage.getItem('category-id')
    const subCatID = localStorage.getItem('sub-cat')

    const formData = new FormData()
    formData.append('store', storeID)
    formData.append('subcategory', subCatID)
    formData.append('category', categoryID)
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('brand', data.brand)
    formData.append('gender', data.gender)
    formData.append('size', data.size)
    formData.append('sleeve_length', data.sleeveLength)

    client
      .post('/ad/products/', formData)
      .then((res) => {
        console.log(res.status, res.data)
        localStorage.setItem('prd-id', res.data.id)
        if (res.status === 400) {
          setErrors(res.data)
        }
      })
      .catch((error) => {
        console.log(error.response)
      })

    setTimeout(() => {
      const prdID = localStorage.getItem('prd-id')
      console.log(prdID)
      const token = localStorage.getItem('USER_ACCESS_TOKEN')
      const formDt = new FormData()
      // for (let img of selectedImages) {
      //   formDt.append('image', img)
      // }
      //formDt.append('upload_preset', 'lfrco1u3')
      if (selectedImages.length > 0) {
        for (let i = 0; i < selectedImages.length; i++) {
          formDt.append('image', selectedImages[i])
        }
      }
      client
        .post(`/ad/products/${prdID}/images/`, formDt, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data)
          localStorage.removeItem('category-id')
          localStorage.removeItem('sub-cat')
          localStorage.removeItem('prd-id')
          toast.success(`${data.name} has been successfuly added to store`)
          navigate('/profile')
        })
    }, 3000)
  }

  function deleteHandler(e) {
    const del = selectedImages.filter((url, index) => index !== e)
    setSelectedImages(del)
    console.log(del)
    //URL.revokeObjectURL(url)
  }

  return (
    <div className='input-div' id='input-div'>
      <form onSubmit={submitData} className='product-attributes'>
        <div className='div-cover' id='div-cover'>
          <h2>Add Photo</h2>
          <div className='add-image-display' id='add-image-display'>
            <div className='file-cc' id='file-cc'>
              <div className='file-card'>
                <div className='file-input'>
                  <input
                    type='file'
                    name='image'
                    multiple
                    onInvalid={errors.selectedImages}
                    id='uploaded_images'
                    onChange={onSelectFile}
                    accept='image/*'
                  />
                  <button>
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <h5>
                *Uploaded images should not be above 5MB, and in “jpg” or “png”
                format. Add 3 Photos or more.
              </h5>
            </div>
            {selectedImages.map((url, index) => {
              return (
                <div className='preview-div'>
                  <div className='img-preview' id='img-preview'>
                    <img src={url} alt='' />
                    <span onClick={() => deleteHandler(index)}>
                      <AiTwotoneDelete />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          {errors.selectedImages && <div>ps:{errors.selectedImages}</div>}
        </div>
        <div className='form1' id='form1'>
          <div className='input' id='input'>
            <p>Name</p>
            <input
              type='text'
              id='name'
              value={data.name}
              onChange={handle}
              //required
            />
          </div>
          <div className='input' id='input'>
            <p>Price</p>
            <input
              type='text'
              id='price'
              value={data.price}
              onChange={handle}
              //required
            />
          </div>
          <div className='description' id='description'>
            <textarea
              id='description'
              type='text'
              value={data.description}
              onChange={handle}
              placeholder='**Additional Description'
            ></textarea>
            <p>**not more than 150 characters</p>
          </div>
        </div>
        <div className='formDescription' id='formDescription'>
          <h1>Additional description</h1>
          <div className='div-flex'>
            <div className='box1'>
              <p>Brand</p>
              <input
                type='text'
                id='brand'
                value={data.brand}
                onChange={handle}
                required
              />
            </div>
            <div className='box2'>
              <p>Gender</p>
              <input
                type='text'
                id='gender'
                value={data.gender}
                onChange={handle}
                //required
              />
            </div>
          </div>
          <div className='div-flex'>
            <div className='box3'>
              <p>Size</p>
              <input
                type='text'
                id='size'
                value={data.size}
                onChange={handle}
                //required
              />
            </div>
            <div className='box4'>
              <p>Sleeve Length [optional]</p>
              <input
                type='text'
                id='sleeveLength'
                value={data.sleeveLength}
                onChange={handle}
                //required
              />
            </div>
          </div>
        </div>
        <div className='upload-div' id='upload-div'>
          <button type='submit' className='uploadBtn' id='uploadBtn'>
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}

export default Fashion
