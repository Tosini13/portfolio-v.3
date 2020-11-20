import React from 'react';
import SectionComponent from "../Section";

export interface aboutMeProps {
    
}
 
const AboutMe: React.FC<aboutMeProps> = () => {
    return (
        <SectionComponent title={'About me'}>
            <p>
                Lorem ipsum
            </p>
        </SectionComponent>
    );
}
 
export default AboutMe;