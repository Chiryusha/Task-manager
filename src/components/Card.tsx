import type { ReactNode } from "react";

interface CardProps {
    title: string;
    children: ReactNode;
}


const Card = ({title, children}: CardProps) =>{
    return (
        <section className="card">
            <h3 className="card-title">{title}</h3>
            {children}
        </section>
    );
};
export default Card;
