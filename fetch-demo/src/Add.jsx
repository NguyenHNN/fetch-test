import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField, Typography, Button, Switch, FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, AlertTitle
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Add() {
  const baseUrl = "http://localhost:3001/players";
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      nation: "",
      club: "",
      cost: 0,
      clip: "",
      description: "",
      img: "",
      top: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      nation: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      club: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      cost: Yup.number().integer().typeError("Please type a number."),
      description: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      clip: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      img: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
    }),
    onSubmit: (values) => {
      fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => setOpen(true))
        .catch((error) => console.log(error.message));
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{ padding: "20px" }}>
        <TextField name="name" label="Name" variant="standard" fullWidth value={formik.values.name} onChange={formik.handleChange} />
        {formik.errors.name && <Typography variant="caption" color="red">{formik.errors.name}</Typography>}

        <TextField name="club" label="Club" variant="standard" fullWidth value={formik.values.club} onChange={formik.handleChange} />
        {formik.errors.club && <Typography variant="caption" color="red">{formik.errors.club}</Typography>}

        <TextField name="nation" label="Nation" variant="standard" fullWidth value={formik.values.nation} onChange={formik.handleChange} />
        {formik.errors.nation && <Typography variant="caption" color="red">{formik.errors.nation}</Typography>}

        <TextField name="img" label="URL of image" variant="standard" fullWidth value={formik.values.img} onChange={formik.handleChange} />
        {formik.errors.img && <Typography variant="caption" color="red">{formik.errors.img}</Typography>}

        <TextField name="cost" label="Market value" variant="standard" fullWidth value={formik.values.cost} onChange={formik.handleChange} />
        {formik.errors.cost && <Typography variant="caption" color="red">{formik.errors.cost}</Typography>}

        <TextField name="clip" label="Intro video" variant="standard" fullWidth value={formik.values.clip} onChange={formik.handleChange} />
        {formik.errors.clip && <Typography variant="caption" color="red">{formik.errors.clip}</Typography>}

        <TextField name="description" label="Information" variant="standard" fullWidth multiline rows={2} value={formik.values.description} onChange={formik.handleChange} />
        {formik.errors.description && <Typography variant="caption" color="red">{formik.errors.description}</Typography>}

        <FormControlLabel control={<Switch />} label="Top players" name="top" onChange={(e) => formik.setFieldValue("top", e.target.checked)} />

        <Button variant="contained" size="small" type="submit">Add</Button>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Congraturation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alert severity="success">
              <AlertTitle>Adding successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button><Link to='/' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
          <Button autoFocus onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
