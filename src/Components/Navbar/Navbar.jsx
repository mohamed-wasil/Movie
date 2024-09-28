import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../Images/logo1.png'
import navbarCSS from './Navbar.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { searchContext } from '../../Context/SearchContext'
import { ColorRing } from 'react-loader-spinner'
export default function Navbar() {


  const { pathname } = useLocation()
  const [activeSearchItem, setActiveSearchItem ] = useState(localStorage.getItem("searchName") ? localStorage.getItem("searchName") :"movie");

function handleSearchlistActive(item){
  setActiveSearchItem(item)
  localStorage.setItem("searchName" , item)
}



  const [activeItem, setActiveItem] = useState(localStorage.getItem('pathName' ? localStorage.getItem('pathName') :'home'))
  

  // handle active class
  // function handleItemClick (item)  {
  //   // if (pathname === "/home" || pathname === "/ ") {
  //   //   setActiveItem('home')
  //   // } else if (pathname === "/movie") {
  //   //   setActiveItem('movie')
  //   // } else if (pathname === "/tv") {
  //   //   setActiveItem('tv')
  //   // } else if (pathname === "/people") {
  //   //   setActiveItem('people')
  //   // }
  //   // else{
  //   //   setActiveItem(item);
  //   // }
  //   setActiveItem(item);
  //   localStorage.setItem("pathNmame" , activeItem)
  // };


  const { searchResults, setSearchResults, searchType, setSearchType, setSearchWords } = useContext(searchContext)

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [msgLoginError, setMsgLoginError] = useState(undefined);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [msgError, setMsgError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  // formik of search
  async function search(data) {
    try {
      let res = await axios.get(`https://api.themoviedb.org/3/search/${searchType}?include_adult=false&language=en-US&page=1`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNzI1OTkzOC41OTg4MDcsInN1YiI6IjY1NzM4NDM4MjgxMWExMDEzOGE2MzU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sd1Kd3iTrwN55KW1oxy75kXuQWHKbfcWJFplcZ2Phc4',
          accept: "application/json"
        },
        params: {
          query: data,
        }
      })
      await setSearchResults(res.data.results);
      navigate('/search')

    } catch (error) {
      console.log(error);

    }
  }

  function handleSearchSubmit(value) {
    setSearchWords(value.searchName);
    search(value.searchName)

  }
  const myFormik = useFormik({
    initialValues: {
      searchName: '',
    },
    onSubmit: (value) => {
      handleSearchSubmit(value)
    },
  })
  // FORMIK OR lOGIN
  const loginData = {
    email: '',
    password: '',
  }

  function sendLoginData(data) {
    setIsLoginLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((x) => {

        setIsLoginSuccess(true);
        setTimeout(() => {
          setIsLoginSuccess(false)
        }, 2000)

        loginFormik.resetForm();
      })
      .catch((x) => {
        try {
          setMsgLoginError(x.response.data.errors.msg);
        } catch {
          setMsgLoginError(x.response.data.message);
        }

      }).finally(() => {
        setIsLoginLoading(false);
      })
  }

  const loginSubmit = (values) => {
    sendLoginData(values)
  }

  const loginValidate = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),

  })

  const loginFormik = useFormik({
    initialValues: loginData,
    onSubmit: loginSubmit,
    validationSchema: loginValidate,
  })


  // formik of register ---------------------------
  const registerData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
  }

  function sendRegisterData(data) {
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((x) => {

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)

        registerFormik.resetForm();
      })
      .catch((x) => {
        try {
          setMsgError(x.response.data.errors.msg);
        } catch {
          setMsgError(x.response.data.message);
        }

      }).finally(() => {
        setIsLoading(false);
      })
  }

  const mySubmit = (values) => {
    sendRegisterData(values)
  }

  const myValidate = Yup.object({
    name: Yup.string().required('Name is required').min(3, "name must be more than 3 char"),
    email: Yup.string().required('Email is required'),
    phone: Yup.number().required('Phone is required'),
    password: Yup.string().required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  })

  const registerFormik = useFormik({
    initialValues: registerData,
    onSubmit: mySubmit,
    validationSchema: myValidate,
  })

  useEffect(() => { }, [activeItem])
  return <>
    <div  className={navbarCSS.nav_section}>
      <nav id='header' className={"navbar navbar-expand-lg  " + navbarCSS.nav}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <button className={"navbar-toggler bg-black "+ navbarCSS.bar} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span ><i class="fa-solid fa-bars-staggered"></i></span>
          </button>
          {/* setActiveItem(item);
          localStorage.setItem("pathNmame" , activeItem) */}
          <div className={"collapse navbar-collapse "+ navbarCSS.drop_menu} id="navbarSupportedContent">

            <ul className={"navbar-nav me-auto mb-2 mb-lg-0 " + navbarCSS.list}>
              <li className={"nav-item "} onClick={() =>{ setActiveItem('home')
                  localStorage.setItem("pathNmame" , activeItem)
              }} >
                <Link className={"nav-link " + navbarCSS.links + " " + (activeItem === "home" ? navbarCSS.active : '' )} to="/home">Home</Link>
              </li>
              <li className="nav-item" onClick={() =>{ setActiveItem('movie')
                  localStorage.setItem("pathNmame" , activeItem)
              }}>
                <Link className={"nav-link " + navbarCSS.links + " " + (activeItem ==="movie" ? navbarCSS.active : '' )} to="/movie">Movies</Link>
              </li>
              <li className="nav-item" onClick={() =>{ setActiveItem('tv')
                  localStorage.setItem("pathNmame" , activeItem)
              }} >
                <Link className={"nav-link " + navbarCSS.links + " " + (activeItem ==="tv" ? navbarCSS.active : '' )} to="/tv">TV Shows</Link>
              </li>
              <li className="nav-item" onClick={() =>{ setActiveItem('people')
                  localStorage.setItem("pathNmame" , activeItem)
              }}>
                <Link className={"nav-link " + navbarCSS.links + " " + (activeItem ==="people" ? navbarCSS.active : '' )} to="/people">People</Link>
              </li>
             
            </ul>

            <ul className={"navbar-nav ms-auto mb-2 mb-lg-0 " + navbarCSS.list}>
              <li className="nav-item">
                <button data-bs-toggle="modal" data-bs-target="#login_model" className={"nav-link " + navbarCSS.links} >Login</button>

                <div
                  className={"modal fade " + navbarCSS.model} id="login_model" tabIndex={-1} aria-labelledby="login_modelLabel" aria-hidden="true" >
                  <div className="modal-dialog ">
                    <div className={"modal-content " + navbarCSS.model_content}>
                      <div className={"modal-header " + navbarCSS.model_header}>
                        <h1 className="modal-title fs-5" id="login_modelLabel">
                          Login
                        </h1>
                        <button
                          type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className={"modal-body " + navbarCSS.model_body}>
                        {isLoginSuccess ? <div className={" mb-3 " + navbarCSS.alert_success}>Login Success.</div> : ""}
                        {msgLoginError ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{msgLoginError} </div> : ""}

                        <form onSubmit={loginFormik.handleSubmit}>
                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-regular fa-envelope"></i></span>
                            <input onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} type="email" className="form-control" id="email" name="email" value={loginFormik.values.email} placeholder='Email' />
                          </div>
                          {loginFormik.errors.email && loginFormik.touched.email ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{loginFormik.errors.email}</div> : ''}

                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-solid fa-lock"></i></span>
                            <input onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} type="password" className="form-control" id="password" name="password" value={loginFormik.values.password} placeholder='Password' />
                          </div>
                          {loginFormik.errors.password && loginFormik.touched.password ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{loginFormik.errors.password}</div> : ''}

                          <div className="form-check">
                          </div>
                          <button type="submit" className={"btn " + navbarCSS.model_btn}>
                            {isLoginLoading ? <ColorRing
                              visible={true}
                              height="30"
                              width="30"
                              ariaLabel="color-ring-loading"
                              wrapperStyle={{}}
                              wrapperClass="color-ring-wrapper"
                              colors={['#eee', '#FFF', '#FFF', '#FFF', '#FFF']}
                            /> : "Login"}
                          </button>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                {/* <Link class={"nav-link " + navbarCSS.links + " " + navbarCSS.btn} to="/register">Register</Link> */}
                <button data-bs-toggle="modal" data-bs-target="#Register_model" class={"nav-link " + navbarCSS.links + " " + navbarCSS.btn} >Register</button>

                <div
                  className={"modal fade " + navbarCSS.model} id="Register_model" tabIndex={-1} aria-labelledby="Register_modelLabel" aria-hidden="true" >
                  <div className="modal-dialog ">
                    <div className={"modal-content " + navbarCSS.model_content}>
                      <div className={"modal-header " + navbarCSS.model_header}>
                        <h1 className="modal-title fs-5" id="Register_modelLabel">
                          Sign up
                        </h1>
                        <button
                          type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className={"modal-body " + navbarCSS.model_body}>

                        {isSuccess ? <div className={" mb-3 " + navbarCSS.alert_success}>account has been created.</div> : ""}
                        {msgError ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{msgError} </div> : ""}
                        <form onSubmit={registerFormik.handleSubmit}>
                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-regular fa-user"></i></span>
                            <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" className="form-control" id="name" name="name" value={registerFormik.values.name} placeholder='Nickname' />

                          </div>
                          {registerFormik.errors.name && registerFormik.touched.name ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{registerFormik.errors.name}</div> : ''}

                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-regular fa-envelope"></i></span>
                            <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" className="form-control" id="email" name="email" value={registerFormik.values.email} placeholder='Email' />
                          </div>
                          {registerFormik.errors.email && registerFormik.touched.email ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{registerFormik.errors.email}</div> : ''}


                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-solid fa-phone"></i></span>
                            <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="tel" className="form-control" id="phone" name="phone" value={registerFormik.values.phone} placeholder='Phone Number' />
                          </div>
                          {registerFormik.errors.phone && registerFormik.touched.phone ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{registerFormik.errors.phone}</div> : ''}

                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-solid fa-lock"></i></span>
                            <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" className="form-control" id="password" name="password" value={registerFormik.values.password} placeholder='Password' />
                          </div>
                          {registerFormik.errors.password && registerFormik.touched.password ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{registerFormik.errors.password}</div> : ''}

                          <div className={navbarCSS.input_group}>
                            <span><i class="fa-solid fa-lock"></i></span>
                            <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" className="form-control" id="rePassword" name="rePassword" value={registerFormik.values.rePassword} placeholder='Confirm Password' />
                          </div>
                          {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className={" mb-3 " + navbarCSS.alert_wrong}>{registerFormik.errors.rePassword}</div> : ''}

                          <div className="form-check">


                          </div>
                          <button type="submit" className={"btn " + navbarCSS.model_btn}>
                            {isLoading ? <ColorRing
                              visible={true}
                              height="30"
                              width="30"
                              ariaLabel="color-ring-loading"
                              wrapperStyle={{}}
                              wrapperClass="color-ring-wrapper"
                              colors={['#eee', '#FFF', '#FFF', '#FFF', '#FFF']}
                            /> : "Register"}
                          </button>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      <div className="container">

        <form onSubmit={myFormik.handleSubmit} className={navbarCSS.top_search}>
          <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.searchName} type="text" id='searchName' name='searchName' placeholder="Search fer a movie and TV Shows that you are looking for" required />
          <div class={"dropdown " + navbarCSS.dropdown}>
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Search By {searchType}
            </button>
            <ul class="dropdown-menu text-center">
            <li className={activeSearchItem == "movie" ? navbarCSS.dropdown_active : ''}><Link to='/search' onClick={() => {
                setSearchType('movie');
                localStorage.setItem('searchType', 'movie');
                handleSearchlistActive("movie")
                myFormik.submitForm();
              }} className='h5'> movie </Link></li>


              <li className={activeSearchItem == "tv" ? navbarCSS.dropdown_active : ''}><Link to='/search' onClick={() => {
                setSearchType('tv');
                localStorage.setItem('searchType', 'tv');
                handleSearchlistActive("tv")
                myFormik.submitForm();

              }} className='h5'> Tv </Link></li>

              <li className={activeSearchItem == "person" ? navbarCSS.dropdown_active : ''}><Link to='/search' onClick={() => {
                setSearchType('person');
                localStorage.setItem('searchType', 'person');
                handleSearchlistActive('person')
                myFormik.submitForm();

              }} className='h5'> Person </Link></li>

            </ul>
          </div>

          {/* <button type='submit'><i class={"fa-solid fa-magnifying-glass"}></i></button> */}
        </form>
      </div>
    </div>
  </>
}
