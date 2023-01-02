import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import AuthContext from '../../../contexts/authContext';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/home'), [navigate]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors: { email?: string; password?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};

			const response = await fetch('http://localhost:8080/api/login', requestOptions);
			const userObject = await response.json();
			console.log('userObject', userObject);
			if (userObject.email === undefined || userObject.email === null) {
				formik.setFieldError('password', 'Username and password do not match.');
			} else {
				if (setUser) {
					setUser(userObject.email);
					localStorage.setItem('userObject', JSON.stringify(userObject));
					handleOnClick();
				}
			}
		},
	});

	const signupFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: '',
			password: '',
			email: '',
		},
		validate: (values) => {
			const errors: { name?: string; email?: string; password?: string } = {};

			if (!values.name) {
				errors.name = 'Required';
			}

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}
			return errors;
		},
		validateOnChange: true,
		onSubmit: async (values) => {
			console.log(values);
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};

			await fetch('http://localhost:8080/api/signup', requestOptions);
			setSingUpStatus(!singUpStatus);
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setSignInPassword(true);
		setIsLoading(false);
	};

	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !singUpStatus, 'bg-info': singUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={350} height={100} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								<form className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup id='email' isFloating label='Your email'>
													<Input
														autoComplete='given-email'
														value={signupFormik.values.email}
														isTouched={signupFormik.touched.email}
														invalidFeedback={signupFormik.errors.email}
														isValid={signupFormik.isValid}
														onChange={signupFormik.handleChange}
														onBlur={signupFormik.handleBlur}
														onFocus={() => {
															signupFormik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup id='name' isFloating label='Your name'>
													<Input
														autoComplete='given-name'
														value={signupFormik.values.name}
														isTouched={signupFormik.touched.name}
														invalidFeedback={signupFormik.errors.name}
														isValid={signupFormik.isValid}
														onChange={signupFormik.handleChange}
														onBlur={signupFormik.handleBlur}
														onFocus={() => {
															signupFormik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup
													id='password'
													isFloating
													label='Your Password'>
													<Input
														type='password'
														autoComplete='given-password'
														value={signupFormik.values.password}
														isTouched={signupFormik.touched.password}
														invalidFeedback={
															signupFormik.errors.password
														}
														isValid={signupFormik.isValid}
														onChange={signupFormik.handleChange}
														onBlur={signupFormik.handleBlur}
														onFocus={() => {
															signupFormik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={signupFormik.handleSubmit}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='email'
													isFloating
													label='Your email'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='email'
														value={formik.values.email}
														isTouched={formik.touched.email}
														invalidFeedback={formik.errors.email}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
												{signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formik.values.email}
													</div>
												)}
												<FormGroup
													id='password'
													isFloating
													label='Password'
													className={classNames({
														'd-none': !signInPassword,
													})}>
													<Input
														type='password'
														autoComplete='password'
														value={formik.values.password}
														isTouched={formik.touched.password}
														invalidFeedback={formik.errors.password}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.email}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formik.handleSubmit}>
														Login
													</Button>
												)}
											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
