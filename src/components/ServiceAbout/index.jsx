import './index.scss'

function ServiceAbout({service}) {
    return (
        <section id={"serviceAbout"}>
            <div className={"container"}>
                <div className={"box"}>
                    <h2>About service</h2>
                    <p>{service?.description}</p>
                </div>
                <div className={"button"}>
                    <button>Let’s connect</button>
                </div>
            </div>
        </section>
    );
}

export default ServiceAbout;