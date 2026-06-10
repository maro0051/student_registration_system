import PublicNavbar from "../components/PublicNavbar";

function Admissions() {


return (

    <>
        <PublicNavbar />

        <div className="page-container">

            <h1>
                Admissions
            </h1>

            <p>
                Begin your academic
                journey today.
            </p>

            <div className="info-grid">

                <div className="info-card">

                    <h3>
                        Step 1
                    </h3>

                    <p>
                        Submit application
                    </p>

                </div>

                <div className="info-card">

                    <h3>
                        Step 2
                    </h3>

                    <p>
                        Upload documents
                    </p>

                </div>

                <div className="info-card">

                    <h3>
                        Step 3
                    </h3>

                    <p>
                        Receive admission
                        decision
                    </p>

                </div>

                <div className="info-card">

                    <h3>
                        Step 4
                    </h3>

                    <p>
                        Register courses
                    </p>

                </div>

            </div>

        </div>

    </>
);


}

export default Admissions;
