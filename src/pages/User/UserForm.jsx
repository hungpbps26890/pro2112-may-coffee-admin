import React, { useEffect, useState } from 'react';
import FormikControl from '../../components/FormControl/FormikControl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { 
  fetchGetUserById, 
  postCreateUser, 
  putUpdateUser } 
  from '../../services/UserService';

const UserForm = () => {
  const [formValues, setFormValues] = useState(null);

  const {id} = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if(id) {
      getUserById(id);
    }
  }, [id]);

  const getUserById = async(id) => {
    const res = await fetchGetUserById(id);

    if( res && res.result){
      const user = res.result;
      console.log(user);
      setFormValues({...user, isActive: user.isActive.toString()});
  };
};

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber:"",
    // password: "",
    isActive: "true"
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data:", values);

    if(id){
      handleUpdateUser(id, values);
    }else{
      handleSaveUser(values);
    }

    navigator("/admin/users");

    onSubmitProps.resetForm();
  };

  const regexPhoneNumber = /^(84|0[3|5|7|8|9])+([0-9]{8})/;

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phoneNumber: Yup.string()
                    .matches(regexPhoneNumber, "Phone number is not valid!")
                    .required("Required"),
    // password: Yup.string().required("Required"),
    // confirmedPassword: Yup.string()
    //                       .required("Required")
    //                       .oneOf([Yup.ref("password")],"Password must be match")
  });

  const radioOptions = [
    {key: "Active", value:"true"},
    {key: "Inactive", value: "false"},
  ];

  const handleSaveUser = async(data) => {
    const res = await postCreateUser(data);

    if(res && res.result){
      console.log(res.result);
      toast.success("Add a new user successfull!");
    }else{
      toast.error("Error adding a new user!");
    }
  };

  const handleUpdateUser = async(id, data) => {
    const res = await putUpdateUser(id, data);

  if(res && res.result){
    console.log(res.result);
    toast.success("Update user successfull!");
  }else{
    toast.error("Error updating an user!")
  };
};
  return (
        <div className="templatemo-content-widget no-padding">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="text-uppercase">User Form</h2>
        </div>
        <div className="panel-body">
            <Formik 
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
              enableReinitialize
              >
              {(formik) => ( 
                 <Form className="templatemo-login-form">
                    <FormikControl
                        control="input"
                        label="Username"
                        name="username"/>
                    
                    <FormikControl
                        control="input"
                        label="Email"
                        name="email"/>
                    
                    <FormikControl
                        control="input"
                        label="First name"
                        name="firstName"/>
                    
                    <FormikControl
                        control="input"
                        label="Last name"
                        name="lastName"/>
                    
                    <FormikControl
                        control="input"
                        label="Phone number"
                        name="phoneNumber"/>
                    
                    {/* <FormikControl
                        control="input"
                        label="Password"
                        name="password"/>
                       */}
                    <FormikControl
                        control="radio"
                        label="Active"
                        name="isActive"
                        options={radioOptions}
                      />
                        <div className="form-group">
                  <button
                    type="submit"
                    className="templatemo-blue-button margin-right-15"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="templatemo-white-button margin-right-15"
                  >
                    Reset
                  </button>
                </div>
                </Form>
                )}
                </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserForm;