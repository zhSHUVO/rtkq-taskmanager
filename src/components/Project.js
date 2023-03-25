import { useDispatch, useSelector } from "react-redux";
import { filterAdded, filterRemoved } from "../features/filter/filterSlice";

export default function Project({ project }) {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.filter);
    const { projectName, colorClass } = project;

    const handleChange = (e) => {
        if (filter.includes(projectName)) {
            dispatch(filterRemoved(projectName));
        } else {
            dispatch(filterAdded(projectName));
        }
    };

    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                className={colorClass}
                checked={filter.includes(projectName) ? true : false}
                onChange={(e) => handleChange(e)}
            />
            <p className="label">{projectName}</p>
        </div>
    );
}
