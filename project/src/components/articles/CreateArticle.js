import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createArticle } from '../../store/actions/articleActions'
import {Redirect} from 'react-router-dom'
import './articles.scss'


class CreateArticle extends Component {
	state = {
		title: '',
		content: ''
	}

	handleChange = (e) => {
		const bodytext = e.target.value.split('\n').join("\n\n\n")
		this.setState({
			[e.target.id]: bodytext
		})
	}


	handleSubmit = (e) => {
		e.preventDefault();
		const {title, content} = this.state
		if (title.length < 4) {
			alert("Введите корректный заголовoк")
		} else if (content.length < 20) {
			alert("Напишите чуть больше текста")
		} else {
			this.props.createArtcile(this.state)
			this.props.history.push('/')
		}
	}

	render() {
		const {auth} = this.props;
		if (!auth.uid) { return <Redirect to='/signin' />}
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white create-form">
				<h5 className="rgey-text text-darken-3">Создайте новую статью</h5>
				<div className="input-field">
					<i className="material-icons prefix">mode_edit</i>
					<label htmlFor="title">Заголовок</label>
					<input type="text" id="title" onChange={this.handleChange}/>
				</div>
				<div className="input-field">
				<i className="material-icons prefix">mode_edit</i>
					<label htmlFor="content">Напишите свои мысли</label>
					<textarea className="materialize-textarea" id="content" onChange={this.handleChange}></textarea>
				</div>
				<div className="input-field">
				<button className="waves-effect waves-light btn">Опубликовать</button></div>
				</form>
			</div>
		)
	}
}
const mapStateToProps = ( state ) => {
	return {
		auth: state.firebase.auth
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		createArtcile: (article) => dispatch(createArticle(article))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle)
