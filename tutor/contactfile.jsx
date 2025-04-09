import './tutorial.css'
export default function Contactfile(props) {
    
    return(
        <>
        <div className="contact-file">
        <img src={props.img} alt="" srcSet="" width={60} />
        <h4>{props.name}</h4>
        <p>{props.number}</p>
        <p>{props.email}</p>
        </div>
        <footer> this my footer and below you can see my small wokr do well to check it out and i will be doing on much task as son as times goes</footer>
        <small>all right reserve here is alerady here</small>
        </>
    )
}