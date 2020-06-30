import styled from 'styled-components';
export const P = styled.p`
	color: ${props => props.color};
`;
export const DIV = styled.div`
	background-color: ${props => props.bg};
`;
export const LI = styled.li`
	color: ${props => props.color};
	&:hover {
		color: ${props => props.colorHover};
	}
`;
export const H1 = styled.h1`
	color: ${props => props.color};
`;
export const H2 = styled.h2`
	color: ${props => props.color};
`;
export const H3 = styled.h3`
	color: ${props => props.color};
`;
export const H5 = styled.h5`
	color: ${props => props.color};
`;
export const BTN_BORDER = styled.button`
	color: ${props => props.color};
	background-color: ${props => props.bg};
	border: 1px solid ${props => props.border};
	&:hover {
		color: ${props => props.colorHover};
		background-color: ${props => props.bgHover};
	}
`;
export const BTN = styled.button`
	color: ${props => props.color};
	background-color: ${props => props.bg};
	&:hover {
		color: ${props => props.colorHover};
		background-color: ${props => props.bgHover};
	}
`;
export const SVG = styled.svg`
	fill: ${props => props.fill};
	&:hover {
		fill: ${props => props.fillHover};
	}
`;
