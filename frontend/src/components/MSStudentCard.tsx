import type { PersonDataProp,  } from "./PeoplePage.tsx";
import "../index.css";

type dataProp = {
    data: PersonDataProp[];
};

export default function MSStudentCard({ data }: dataProp) {
    
    const numberToDegree: { [key: string]: string } = {'1': 'B.S.', '2': 'M.S.', '3': 'Ph.D.'};
    const nameLabel: { [key: string]: PersonDataProp[] } = {};
    data.map((ele) => {nameLabel.hasOwnProperty(ele.name) ? nameLabel[ele.name].push({...ele}) : nameLabel[ele.name] = [{...ele}]});
    Object.keys(nameLabel).forEach((key) => {nameLabel[key].sort((a, b) => b.degree - a.degree)});

    return (
        <>
            {
                Object.keys(nameLabel).map((key) => (
                    <div className="row" key={key}>
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
                            <img src={nameLabel[key][0].imgPath} className="crop rounded-circle" alt="..."/>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8 ptext my-auto">
                            <span className="pplname">{nameLabel[key][0].name}</span><br />
                            {nameLabel[key].map((ele, index) => (
                                <li key={index}>
                                    {numberToDegree[ele.degree]}, {ele.department}, {ele.school}, {ele.yearStart}-{ele.yearEnd === -1 ? null : ele.yearEnd}
                                </li>
                            ))}
                        </div>
                    </div>
                ))
            }
        </>
    )
}
