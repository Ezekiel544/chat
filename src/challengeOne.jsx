import './challengeOne.css';
import  IMG from './loginart.png'
import Facebook from './facebook-icon.jpg'

const ChallengeOne = () => {
 return (
  <div className="container">
   <div className="login-form">
    <h1>Welcome Back 👋</h1>
    <p>Today is a new day. It’s your day. You shape it. Sign in to start managing your projects.</p>
    <form>
     <div className="input-field">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="Example@email.com" required  />
     </div>
     <div className="input-field">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" placeholder="At least 8 characters" required />
     </div>
     <a href="#" className="forgot-password">Forgot Password?</a>
     <button type="submit" className="sign-in">Sign in</button>
     <div className="divider">Or sign in with</div>
     <div className="social-buttons">
      <button type="button" className="google">
       <img src="Google.png" alt="" />
       Google
      </button>
      <button type="button" className="facebook">
       
       <a href="https://www.facebook.com/"><img src={Facebook} alt="" width={10} className='Facebook'/>Facebook</a>
      </button>
     </div>
     <p className="sign-up">Don’t have an account? <a href="#">Sign up</a></p>
    </form>
   </div>
   <div className="login-art">
    <img src={IMG} alt="Login Art" />
   </div>
  </div>
 );
};

export default ChallengeOne;