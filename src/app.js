import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Item from 'component/item.js'
import Footer from 'component/footer.js'

require('style/base.css')
require('style/index.css')

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			todoArr : [],
			inputVal:'',
			view : 'all'
		}

		this.addTodos = this.addTodos.bind(this)
		this.removeTodos = this.removeTodos.bind(this)
		this.checkedAll = this.checkedAll.bind(this)
		this.checkedHandle = this.checkedHandle.bind(this)
		this.clearCompleted = this.clearCompleted.bind(this)
		this.changeVal = this.changeVal.bind(this)
		this.itemEditDone = this.itemEditDone.bind(this)
	}

	itemEditDone(todo, value){
		let {todoArr} = this.state

		todoArr = todoArr.map(elem => {
			if (todo.id === elem.id) {
				elem.value = value
			}
			return elem
		})
	}

	changeVal(e){
		this.setState({
			inputVal: e.target.value
		})
	}

	addTodos(e){
		let {todoArr,inputVal} = this.state

		if (e.nativeEvent.keyCode !== 13) {
				return false
		}

		if (inputVal === '') {
			return false
		}

		let todo = {}

		todo.id = new Date()
		// todo.value = inputVal.trim() + 'mozhongfengchen'
		todo.value = inputVal.trim()
		todo.isSelected = false

		todoArr.unshift(todo)

		this.setState({
			todoArr
		})

		this.setState({
			inputVal : ''
		})

	}

	removeTodos(todo){
		let {todoArr} = this.state

		todoArr = todoArr.filter(elem => elem.id !== todo.id)

		this.setState({
			todoArr
		})
	}

	checkedAll(e){
		let {checked} = e.target
		let {todoArr} = this.state

		todoArr = todoArr.map(elem => {
			elem.isSelected = checked
			return elem
		})

		this.setState({
			todoArr
		})
	}

	checkedHandle(todo){
		let {todoArr} = this.state

		todoArr = todoArr.map(elem => {
			if (todo.id === elem.id) {
				elem.isSelected = !elem.isSelected
			}
			return elem
		})

		this.setState({
			todoArr
		})
	}

	clearCompleted(){

		let {todoArr} = this.state

		todoArr = todoArr.filter(elem => !elem.isSelected)

		this.setState({
			todoArr
		})

	}

	render() {
		let {todoArr, inputVal} = this.state
		let {addTodos, removeTodos, checkedAll, clearCompleted, changeVal, checkedHandle, itemEditDone} = this
		let leftTodos = todoArr.length
		let Items = null
		let	itemslist = null
		let	footer = null
		let todoArrFilters = null
		let {location:{pathname}} = this.props

		console.log(this.props)

		todoArrFilters = todoArr.filter(elem => {
			if (elem.isSelected) {
				leftTodos--
			}
			switch (pathname) {
				case '/active':
					return !elem.isSelected
				case '/complete':
					return elem.isSelected
				default:
					return true
			}
		})

		Items= todoArrFilters.map((elem, index) => <Item {...{removeTodos, checkedHandle, todo:elem, itemEditDone}} key={index}/>)

		if (todoArr.length) {
			itemslist =
					<section className="main">
						<input
							type="checkbox"
							className="toggle-all"
							checked = {leftTodos === 0}
							onChange={checkedAll}
						/>
						<ul className="todo-list">
							{Items}
						</ul>
					</section>

			footer =
					<Footer
						{...{clearCompleted, leftTodos, todoArr, pathname}}
					/>

		}

		return(
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						type="text"
						className="new-todo"
						value={inputVal}
						onChange = {changeVal}
						placeholder="what needs to be done?"
						onKeyDown={addTodos}
					>
					</input>
				</header>
				{itemslist}
				{footer}
			</div>
		)
	}
}

ReactDOM.render(
	<Router>
		<Route path="/" component={App}></Route>
	</Router>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept()
}


