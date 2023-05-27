// Write your JS code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItemDetails extends Component {
  state = {actualData: {}, isLoading: true}

  componentDidMount() {
    this.getInsideItems()
  }

  getInsideItems = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()

    const UpdatedOne = {
      author: data.author,
      avatarUrl: data.avatar_url,
      id: data.id,
      content: data.content,
      imageUrl: data.image_url,
      topic: data.topic,
      title: data.title,
    }
    console.log(UpdatedOne)
    this.setState({actualData: UpdatedOne, isLoading: false})
  }

  render() {
    const {actualData, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <div className="ccc">
            <h1 className="hhs">{actualData.title}</h1>
            <div className="di">
              <img
                src={actualData.avatarUrl}
                alt={actualData.author}
                className="av"
              />
              <p>{actualData.author}</p>
            </div>
            <img
              src={actualData.imageUrl}
              alt={actualData.title}
              className="ii"
            />
            <p>{actualData.content}</p>
          </div>
        )}
      </div>
    )
  }
}
export default BlogItemDetails
