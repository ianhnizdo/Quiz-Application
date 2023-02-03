import React from 'react'

export function Navigation(){
return(
    <div>
        <nav className="SiteNavigation">
            <ul className="SiteList">
                <li className="navbullets"><a>Quiz</a></li>
                <li className="navbullets"><a>Results</a></li>
                <li className="navbullets"><a>Delete Result</a></li>
            </ul>
        </nav>
    </div>
)
}