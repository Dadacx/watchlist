import '../styles/FilmClapboard.css'

const FilmClapboard = ({style}) => {
    return (
        <div className="outercontainer" style={style}>
            <div className="clappercontainer">
                <div className="hinge">
                    <p className="hinge__rivet hinge__rivet--top">⚪️</p>
                    <p className="hinge__rivet hinge__rivet--bottomleft">⚪️</p>
                    <p className="hinge__rivet hinge__rivet--bottomright">⚪️</p>
                </div>
                <div className=" clapper__top rotateUp rotateDown">
                    <div className="clapper__top--white"></div>
                    <div className="clapper__top--white"></div>
                    <div className="clapper__top--white"></div>
                    <div className="clapper__top--white"></div>
                    <div className="clapper__top--white"></div>
                </div>
                <div className="film-clapboard-container">
                    <div className="clapper__bottom">
                        <div className="clapper__bottom--white"></div>
                        <div className="clapper__bottom--white"></div>
                        <div className="clapper__bottom--white"></div>
                        <div className="clapper__bottom--white"></div>
                        <div className="clapper__bottom--white"></div>
                    </div>
                    <div className="info-container">
                        <div className="scene-take-roll">
                            <div className="scene">
                                <p className="text">Scene:</p>
                                <p className="scene__text"></p>
                            </div>
                            <div className="take">
                                <p className="text">Take:</p>
                                <p className="take__text"></p>
                            </div>
                            <div className="roll">
                                <p className="text">Roll:</p>
                                <p className="roll__text"></p>
                            </div>
                        </div>

                        <div className="date-prod-sound">
                            <div className="date-prod">
                                <div className="date">
                                    <p className="text text--padded">Date:</p>
                                    <p className="date__text"></p>
                                </div>
                                <div className="prod">
                                    <p className="text text--padded">Prod.</p>
                                </div>
                            </div>
                            <div className="sound">
                                <p className="text text--padded">Sound:</p>
                            </div>

                        </div>

                        <div className="director">
                            <p className="text text--padded">Director:</p>
                        </div>
                        <div className="cinematographer">
                            <p className="text text--padded">Cinematographer:</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmClapboard;