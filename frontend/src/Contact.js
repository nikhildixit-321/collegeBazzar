import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {
  const {user, isAuthenticated}=useAuth0();
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
  <Wrapper>
    <h2 className="common-heading">Contact Us</h2>
{/* map */}
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.261204598636!2d73.91411937410084!3d18.562259067901596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1691211796346!5m2!1sen!2sin" width="100%" height="400" style={{border:0}}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

    {/* form -method:post because we are ending information*/}
    <div className="container">


      <div className="contact-form">
        {/* contact-inputs class to make it flex */}
        <form action="https://formspree.io/f/mknloabv" method="POST" className="contact-inputs">
          {/* we need name and value attribute whenever we need to connect to a backend, autocomplete is off taki previous wali values dikhayi na de */}
<input
 type="text" 
 placeholder="username" 
 name="username" 
 value={isAuthenticated ? user.name : ""}
 required 
 autoComplete="off" 
 />
<input type="email"
 placeholder="email"
  name="Email"
  value={isAuthenticated ? user.email : ""} 
  required 
  autoComplete="off" />

<textarea name="Message"  placeholder="Enter your message" cols="30" rows="10" reuired autoComplete="off">

</textarea>
<input type="submit" value="send" />
        </form>
      </div>
    </div>
  </Wrapper>
  );
};

export default Contact;
