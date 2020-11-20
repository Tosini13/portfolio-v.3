import React from 'react';
import SectionComponent from "../Section";

export interface SkillsProps {
    
}
 
const Skills: React.FC<SkillsProps> = () => {
    return (
        <SectionComponent title={'Skills'}>
            <p>
                Lorem ipsum
            </p>
        </SectionComponent>
    );
}
 
export default Skills;