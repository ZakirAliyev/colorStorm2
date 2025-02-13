import './index.scss'
import {useTranslation} from "react-i18next";

function ShortInfo() {

    const {t} = useTranslation();

    return (
        <section id={"shortInfo"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>{t('Trusted by 100+ companies around the Azerbaijan')}</h2>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <p>{t('Vulputate molestie molestie amet leo blandit accumsan. Sapien sed amet tellus purus sit odio eget. Diam morbi faucibus vitae neque id in. Nullam sed et dapibus nunc, porta enim orci urna, sit. Lectus ac.')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShortInfo;