import { ReactNode } from "react"

const HandbookList = ({ rules, listIcon } : {listIcon: ReactNode, rules: {[key: string]: string}}) => {
    return <ul>
        {Object.keys(rules).map(rule => {
            return ( 
                <li className="flex items-start my-2" key={rule}>
                    <div className="mr-2 mt-1 ">
                        {listIcon}
                    </div>
                    <div>
                        <span className="font-bold">{rule}:</span><span>{rules[rule]}</span>
                    </div>
                </li>
            )
        })}
    </ul>
}

export default HandbookList