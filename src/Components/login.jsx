



import { Formik } from "formik"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import "../App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../Helper/utils";

const Login = ({ user, loader, setData }) => {
    const navigate = useNavigate()
    const { loginData } = user
    const initialValues = loginData;
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };
    const submitForm = async (values) => {
        try {
            setData({ action: "SET_LOADER", payload: true })
            let data = await axios.post("https://reqres.in/api/login", { ...values })
            setData({ action: "SET_LOADER", payload: false })
            localStorage.setItem('token', data?.data?.token)
            navigate('/welcome')
        } catch (err) {
            setData({ action: "SET_LOADER", payload: false })
            console.log(err)
        }

    };
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) navigate('/welcome')
    }, [token])
    return <>
        <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
            {(form) => {
                const { values, errors, handleChange, handleBlur, isSubmitting, touched, handleSubmit } = form
                return (
                    <form onSubmit={handleSubmit} >
                        <div className="input-div"> <TextField
                            type="email"
                            name="email"
                            label="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className='input'
                        /></div>
                        {errors.email && touched.email && errors.email}
                        <div className="input-div"> <TextField
                            type="password"
                            name="password"
                            label="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className='input'

                        /></div>
                        <Button
                            type="submit"
                            // disabled={Object.keys(errors)?.length}
                            style={{ marginTop: '22px' }}
                            variant="contained"
                        >
                            Submit

                            {loader &&
                                <CircularProgress
                                    color="warning"
                                    size='20.2px'
                                    style={{ marginLeft: '8px' }}
                                />
                            }
                        </Button>
                    </form>)
            }
            }
        </Formik>
    </>
}

const mapStateToProps = (state) => {
    const { loader } = state

    return {
        user: state,
        loader: loader

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)   
