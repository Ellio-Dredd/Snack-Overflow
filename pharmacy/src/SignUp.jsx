export default function SignUp() {
    return(
        <form action="">
            <label htmlFor="Name">
                First Name:
                <input type="fname" /><br />
                Last name:
                <input type="lname" />
            </label><br /><br />

            <label htmlFor="Email">
                Email: 
                <input type="email" hint="Email"/>
            </label><br /><br />

            <label htmlFor="Gender">
                Choose Gender:
                <input type="radio" />Male
                <input type="radio" />Female
            </label><br /><br />

            <label htmlFor="Age">
                Enter age:
                <input type="number" min="1"/>
                <input type="checkbox" name="Years" value="Years"/>Years /
                <input type="checkbox" name="" value="Months"/>Months
            </label><br /><br />
            <input type="submit" className="btn btn-outline-primary"/>
    </form>
    );
}