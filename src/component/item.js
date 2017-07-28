let prppsTypes = {
	todo : PT.object,
	removeTodos : PT.func,
	checkedHandle : PT.func,
	inputVal : PT.string
}

export default class Item extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			isEdit : false,
			inputVal: ''
		}

		this.onEdit = this.onEdit.bind(this)
		this.changeval = this.changeval.bind(this)
		this.keyDownChangeval = this.keyDownChangeval.bind(this)
		this.blurChangeval = this.blurChangeval.bind(this)
		this.itemEditDone = this.itemEditDone.bind(this)
	}

	itemEditDone(){

		this.setState({
			isEdit : false
		})

		let {todo, itemEditDone} = this.props

		itemEditDone(todo, this.state.inputVal)
	}


	blurChangeval(){
		this.itemEditDone()
	}

	keyDownChangeval(e){

		let initval = this.props.todo.value
		let {inputVal} = this.state

		if (e.nativeEvent.keyCode === 27) {
			this.setState({
				isEdit : false,
				inputVal : initval
			})
			return false
		}

		if (e.nativeEvent.keyCode !== 13) {
			return false
		}

		if (inputVal === '') {
			return false
		}

		this.itemEditDone()

	}

	changeval(e){
		this.setState({
			inputVal : e.target.value.trim()
		})
	}

	onEdit(e){
		let {value} = this.props.todo

		this.setState({
			isEdit : true,
			inputVal : value
		},() => {
this.inputObj.focus()
})

	}

	render(){
		let {onEdit,changeval,keyDownChangeval,blurChangeval} = this
		let {isEdit,inputVal} = this.state
		let {todo,removeTodos,checkedHandle,itemEditDone} = this.props
		let editClassName = todo.isSelected ? 'completed' : ''

		editClassName = isEdit ? editClassName += ' editing' : editClassName
		return(
			<li className={editClassName}>
				<div className="view">
					<input
						type="checkbox"
						className="toggle"
						checked = {todo.isSelected}
						onChange ={ ev => checkedHandle(todo) }
					/>
					<label
						htmlFor=""
						onDoubleClick = {onEdit}
					>
						{todo.value}
					</label>
					<button className="destroy" onClick={ev => removeTodos(todo) } ></button>
				</div>
				<input
					ref = { input => this.inputObj = input }
					type="text"
					className="edit"
					value = {inputVal}
					onChange = {changeval}
					onKeyDown = {keyDownChangeval}
					onBlur = {blurChangeval}
				/>
			</li>
		)
	}
}

Item.PT = prppsTypes


