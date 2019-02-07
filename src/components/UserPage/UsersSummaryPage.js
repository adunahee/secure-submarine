import React, { Component } from 'react'
import { connect } from 'react-redux';

class UsersSummaryPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USERS' });
    }

    fetchUserSummary = () => {
        
    }

    render() {
        console.log(this.props.userSummary);
        
        return (
            <div>
                <h2>
                    User Summary Page
                </h2>
                {this.props.userSummary &&
                    <ul>
                        {this.props.userSummary.map((user, index )=> {
                            return <li key={index}>{user.username}</li>
                        })}
                    </ul>
                }
                
            </div>
        )
    }
}

const mapUsersSummarytoProps = (rs) => {
    return {userSummary: rs.userSummary}
}

export default connect(mapUsersSummarytoProps)(UsersSummaryPage);
