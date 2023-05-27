// Write your JS code here
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItem extends Component {
  state = {items: [], isLoading: true}

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const updatedData = data.map(each => ({
      id: each.id,
      title: each.title,
      topic: each.topic,
      author: each.author,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
    }))
    console.log(updatedData)
    this.setState({items: updatedData, isLoading: false})
  }

  render() {
    const {items, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="ul">
            {items.map(each => (
              <Link className="link" to={`blogs/${each.id}`} key={each.id}>
                <li key={each.id}>
                  <div className="main">
                    <img className="img" src={each.imageUrl} alt={each.title} />
                    <div className="right">
                      <p>{each.topic}</p>
                      <h1 className="h">{each.title}</h1>
                      <div className="aa">
                        <img
                          src={each.avatarUrl}
                          alt={each.title}
                          className="avaimg"
                        />
                        <p>{each.author}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogItem
