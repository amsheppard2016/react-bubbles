import React, { useState } from "react";
import axiosWithAuth from "../axiosWithAuth";

const initialColor = {
    color: "",
    code: { hex: "" },
};

const ColorList = ({ colors, history, getColorList, updateColors }) => {
    console.log(colors);
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const [addColor, setAddColor] = useState(initialColor);

    const editColor = (color) => {
        setEditing(true);
        setColorToEdit(color);
    };

    const addNew = (e) => {
        e.preventDefault();
        // Make a put request to save your updated color
        // think about where will you get the id from...
        // where is is saved right now?
        axiosWithAuth()
            .post("/colors/", addColor)

            .then((res) => {
                console.log("saveedit;res", res.data);
                getColorList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveEdit = (e) => {
        e.preventDefault();
        // Make a put request to save your updated color
        // think about where will you get the id from...
        // where is is saved right now?
        axiosWithAuth()
            .put(`/colors/${colorToEdit.id}`, colorToEdit)

            .then((res) => {
                console.log("saveedit;res", res.data);
                getColorList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteColor = (color) => {
        // make a delete request to delete this color

        axiosWithAuth()
            .delete(`/colors/${color.id}`)
            .then((res) => {
                console.log("deletecolor;res", res);
                setEditing(false);
                getColorList();

                history.push("/bubblepage");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map((color) => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span
                                className="delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteColor(color);
                                    console.log("deletecolor", color);
                                }}
                            >
                                x
                            </span>{" "}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {!editing && (
                <form onSubmit={addNew}>
                    <legend>Add color</legend>
                    <label>
                        color name:
                        <input
                            onChange={(e) =>
                                setAddColor({
                                    ...addColor,
                                    color: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={(e) =>
                                setAddColor({
                                    ...addColor,
                                    code: { hex: e.target.value },
                                })
                            }
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>
                            cancel
                        </button>
                    </div>
                </form>
            )}
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={(e) =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    color: e.target.value,
                                })
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={(e) =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value },
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>
                            cancel
                        </button>
                    </div>
                </form>
            )}
            <div className="spacer" />

            {/* stretch - build another form here to add a color */}
        </div>
    );
};

export default ColorList;
