import React from 'react'; 
import "./footer.css";

export class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <h1>Reunited</h1>
                <h3>Contact: <a href = "mailto: ukrainereunited@gmail.com" className="a">ukrainereunited@gmail.com</a></h3>
                <p>Reunited &copy;2022</p>
            </div>
        )
    }
}