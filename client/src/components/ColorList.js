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
                setAddColor({
                    color: "",
                    code: { hex: "" },
                });
                getColorList();
                console.log("addColor");
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
                setEditing(false);
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
            <h2>Colors</h2>
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
                    <legend>Add Color</legend>
                    <label>
                        Color Name:
                        <input
                            onChange={(e) =>
                                setAddColor({
                                    ...addColor,
                                    color: e.target.value,
                                })
                            }
                            value={addColor.color}
                        />
                    </label>
                    <label>
                        Hex Code:
                        <input
                            onChange={(e) =>
                                setAddColor({
                                    ...addColor,
                                    code: { hex: e.target.value },
                                })
                            }
                            value={addColor.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>Edit Color</legend>
                    <label>
                        Color Name:
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
                        Hex Code:
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
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>
                            Cancel
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
