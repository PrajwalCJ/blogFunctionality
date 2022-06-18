import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes } from 'react-router';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { setAdmin } from './redux/adminSlice';
import { SignInFrom } from './components/admin/SignInFrom';
import { SignUpForm } from './components/admin/SignUpForm';
import { CreateBlog } from './components/blog/CreateBlog';
import { ViewBlogs } from './components/blog/ViewBlogs';
import React from 'react';
import { Loading } from './components/Loading';

function App() {
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.admin.admin)

  onAuthStateChanged(auth, (admin) => {
    dispatch(setAdmin(admin))
    console.log(admin);
  })

  if(admin === undefined){
    return <Loading/>
  }

  return (
    <div className="App">
      <Routes>
        {admin?
          <>
            <Route index path='/blogs' element={<ViewBlogs />} />
            <Route path='/blogs/add' element={<CreateBlog />} />
            <Route path='/blogs/edit/:id' element={<CreateBlog editMode={true} />} />
            <Route path='/blogs/delete/:id' element={<ViewBlogs/>} />
          </>
          :
          <>
            <Route path='/signin' element={<SignInFrom />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='*' element={<SignInFrom />} />
          </>
        }
      </Routes>
    </div>
  );
}

export default App;
