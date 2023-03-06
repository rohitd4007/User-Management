import { Formik } from "formik"
import axios from "axios"
import { connect } from "react-redux"
import { mapDispatchToProps } from "../Helper/utils";
import '../App.css'
import { Button, CircularProgress, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = ({ user, setData, loader }) => {
    const initialValues = {
        ...user
    };
    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password too short";
        }
        if (!values.confirmpass) {
            errors.confirmpass = "Confirm Password is required";
        } else if (values.confirmpass != values.password) {
            errors.confirmpass = "Confirm Password Should be same as Password";
        }
        return errors;
    };
    const submitForm = async (values) => {
        setData({ action: "SET_LOADER", payload: true })

        try {
            let data = await axios.post("https://reqres.in/api/register", { ...values })
            setData({ action: "SET_LOADER", payload: false })
            setData({ action: "ADD_USER", payload: true })
            navigate('/login')
        } catch (err) {
            console.log(err)
            setData({ action: "SET_LOADER", payload: false })
        }
    };

    const navigate = useNavigate()
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
                        <div>
                            <div className="input-div">
                                <TextField
                                    type="fname"
                                    name="fname"
                                    label="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fname}
                                    className='input'
                                    size="small"
                                />
                            </div>
                            <div className="input-div"> <TextField
                                type="lname"
                                name="lname"
                                label="Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lname}
                                className='input'
                                size="small"

                            /></div>
                            <div className="input-div">  <TextField
                                type="email"
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className='input'
                                size="small"

                            /></div>
                            <span className="error-span">{errors?.email && touched?.email && errors?.email}</span>
                            <div className="input-div">   <TextField
                                type="password"
                                name="password"
                                label="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className='input'
                                size="small"
                            /></div>
                            <span className="error-span"> {errors?.password && touched?.password && errors?.password}</span>
                            <div className="input-div">
                                <TextField
                                    type="password"
                                    name="confirmpass"
                                    label="Confirm Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmpass}
                                    className='input'
                                    size="small"

                                />
                            </div>
                            <span className="error-span">{errors.confirmpass && touched.confirmpass && errors.confirmpass}</span>
                        </div>
                        <Button
                            type="submit"
                            disabled={Object.keys(errors)?.length !== 0}
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
    const { regData, loader } = state
    return {
        user: regData,
        loader: loader
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)

