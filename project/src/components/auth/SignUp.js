import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import * as firebase from 'firebase/app';
import './Sign.scss'

class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			nickname: '',
			namesList: [],
			isFree: true,
			isEmailValid: null
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
		setTimeout(this.check, 100)
	}

	check = () => {
		const {namesList, nickname} = this.state
		for (let name of namesList) {
			if (name === nickname) {
				this.setState(() => {
					return {isFree: false}
				})
				return
			}	else {
					this.setState(() => {
						return {isFree: true}
					})
				}
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {isFree, nickname, email} = this.state
		if (nickname.length <3) {
			alert("Длина логина должна быть больше 3 символов")
		} else {
			email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? 
			this.setState({
				isEmailValid: true
			})
			: this.setState({
				isEmailValid: true
			})
			if (isFree) {
				this.props.signUp(this.state)
			}
			else {
				alert(`Имя ${nickname} занято, придумайте другое`)
			}
		}
	}

	componentDidMount() {
		const db = firebase.firestore()
		db.collection('users').get().then((snapshot) => {
			snapshot.docs.forEach(doc => {
				this.setState(({namesList}) => {
					namesList.push(doc.data().nickname)
				})
			})
		})
  };

	render() {
		const {isFree, isEmailValid} = this.state
		const {auth, authError} = this.props

		if (auth.uid) { return <Redirect to='/' />}

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white signup-form">
				<h5 className="rgey-text text-darken-3">Зарегистрируйтесь, заполнив форму ниже</h5>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" onChange={this.handleChange}/>
					{ isEmailValid ? <p>укажите корректный email</p>: null}
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" onChange={this.handleChange}/>
				</div>
				<div className="input-field">
					<label htmlFor="nickname">Придумайте никнейм</label>
					<input  type="text" id="nickname" onChange={this.handleChange} maxLength="16"/>
					{!isFree && <span className="red-text">Такое имя уже занято</span>}
				</div>
				<div className="input-field">
					<button className="btn blue lighten-2 z-depth-0">Зарегистироваться</button>
					{ authError ? <p>Проверьте введённые данные. Пароль должен быть не меньше 6 символов</p>: null}
				</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
