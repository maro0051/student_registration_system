import PublicNavbar from "../components/PublicNavbar";

function Contact() {


return (

    <>
        <PublicNavbar />

        <div className="page-container">

            <h1>
                Contact Us
            </h1>

            <div className="contact-card">

                <h3>
                    Student Registration Office
                </h3>

                <p>
                    123 University Avenue
                </p>

                <p>
                    Montreal, Quebec
                </p>

                <p>
                    (514) 555-1234
                </p>

                <p>
                    registrar@university.edu
                </p>

                <p>
                    Monday - Friday
                    8:00 AM - 5:00 PM
                </p>

            </div>

        </div>

    </>
);


}

export default Contact;
