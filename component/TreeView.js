import React from 'react'
import types from 'prop-types'

import {
  TouchableOpacity,
  View,
} from 'react-native'

export default class TreeView extends React.PureComponent {
  static propTypes = {
    data: types.array.isRequired,
    renderItem: types.func.isRequired,
    collapsedItemHeight: types.number,
    idKey: types.string,
    childrenKey: types.string,
    onItemPress: types.func,
    onItemLongPress: types.func,
    deleteOnLongPress: types.bool,
  }

  static defaultProps = {
    collapsedItemHeight: 25,
    deleteOnLongPress: false,
    idKey: 'id',
    childrenKey: 'children',
    expandAll: false
  }

  constructor(props) {
    super(props)

    this.state = {
      data: this.makeCollapsed(props.data.slice()),
      idKey: props.idKey,
      childrenKey: props.childrenKey,
      expandAll: props.expandAll
    }

    this.handleNodePressed = this.handleNodePressed.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: this.makeCollapsed(props.data.slice()),
    })
  }

  makeCollapsed(data) {
    return data.map(children => {
      if(children[this.props.childrenKey]) {
        if(typeof children.collapsed === 'undefined') {
          children.collapsed = this.props.expandAll? false:true
        }

        this.makeCollapsed(children[this.props.childrenKey])
      } else {
        children.collapsed = null
      }
      return children
    })
  }

  toggleCollapse(data, id) {
    let found

    return data.map(children => {
      if(
        children[this.props.idKey] === id &&
        typeof children.collapsed !== 'undefined' &&
        children.collapsed !== null
      ) {
        children.collapsed = !children.collapsed
        found = true
      }

      if(!found && children[this.props.childrenKey]) {
        this.toggleCollapse(children[this.props.childrenKey], id)
      }

      return children
    })
  }

  removeNull(data) {
    data.map((children, i) => {
      if(children[this.props.childrenKey]) {
        children[this.props.childrenKey] = children[this.props.childrenKey]
          .filter(i => i !== null)

        if(!children[this.props.childrenKey].length) {
          delete children[this.props.childrenKey]
          children.collapsed = null
        }
      }
    })
  }

  deleteNode(data, id) {
    data.map((children, i) => {
      if(children[this.props.childrenKey]) {
        this.deleteNode(children[this.props.childrenKey], id)
      }

      if(children[this.props.idKey] === id) {
        delete data[i]
      }
    })

    this.removeNull(data)

    return data
  }

  removeCollapsedKey(data) {
    data.map((children, i) => {
      if(children[this.props.childrenKey]) {
        this.removeCollapsedKey(children[this.props.childrenKey])
      }

      delete children.collapsed
    })

    return data
  }

  getRawData() {
    return this.removeCollapsedKey(this.state.data.slice())
  }

  handleNodePressed(children, level) {
    this.props.onItemPress && this.props.onItemPress(children, level)
  }

  handleNodeLongPressed(children, level){
    const newData = this.toggleCollapse(
      this.state.data.slice(),
      children[this.props.idKey]
    )

    this.setState({
      data: newData,
    })

  }

  handleDeleteNode(id) {
    const data = this.deleteNode(this.state.data.slice(), id)

    this.setState({
      data,
    })
  }

  renderTree(data, level) {
    return data.map(children => {
      const hasChildren = children[this.props.childrenKey] &&
        children[this.props.childrenKey].length > 0

      return (
        <View
          key={children[this.props.idKey]}
          style={{
            height: (
              children.collapsed ? this.props.collapsedItemHeight : 'auto'
            ),
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            onPress={() => this.handleNodePressed(children, level)}
            onLongPress={() => this.handleNodeLongPressed(children, level)}
          >
            {this.props.renderItem(children, level)}
          </TouchableOpacity>
          {
            hasChildren &&
            this.renderTree(children[this.props.childrenKey], level + 1)
          }
        </View>
      )
    })
  }

  render() {
    return this.renderTree(this.state.data, 0)
  }
}
