import { formatBirr } from "../../utils/currency";

export default function Price({ value, className = "" }) { return <span className={className}>{formatBirr(value)}</span>; }
