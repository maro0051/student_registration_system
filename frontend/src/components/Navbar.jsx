function Navbar() {

    const username =
        localStorage.getItem(
            "username"
        );

    const role =
        localStorage.getItem(
            "user_role"
        );

    return (

        <div className="bg-white border-bottom p-3">

            <div className="d-flex justify-content-between">

                <h5>

                    {role} Portal

                </h5>

                <span>

                    Welcome,

                    <strong>
                        {" "}
                        {username}
                    </strong>

                </span>

            </div>

        </div>

    );

}

export default Navbar;