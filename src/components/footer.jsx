import './footer.css';

function Footer() {
  return (
    <footer>
    <div className="container">
        {/* <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                <ul className="social">
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="#"><i className="fa fa-rss"></i></a></li>
                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                </ul>
            </div>
        </div> */}
        <div className="row">
            <div className="col-lg-12">
                <p className="copyright">Copyright &copy; 2024 Profact</p>
            </div>
        </div>
    </div>
</footer>
  );
}

export default Footer;