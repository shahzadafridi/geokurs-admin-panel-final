<?php

function photoGallery($value)
{
    return "<a class='btn btn-primary btn-sm' href=".base_url("admin/product/{$value}/gallery")."><strong>Gallery</strong></a>";
}

function exception_example($postdata, $primary, $xcrud)
{
    // get random field from $postdata
    $postdata_prepared = array_keys($postdata->to_array());

    shuffle($postdata_prepared);
    $random_field = array_shift($postdata_prepared);

    // set error message
    $xcrud->set_exception($random_field, 'This is a test error', 'error');
}

function test_column_callback($value, $fieldname, $primary, $row, $xcrud)
{
    return $value . ' - nice!';
}

function after_upload_example($field, $file_name, $file_path, $params, $xcrud)
{
    $ext = trim(strtolower(strrchr($file_name, '.')), '.');
    if ($ext != 'pdf' && $field == 'uploads.simple_upload')
    {
        unlink($file_path);
        $xcrud->set_exception('simple_upload', 'This is not PDF', 'error');
    }
}

function custom_field($value, $fieldname, $primary_key, $row, $xcrud)
{
    return '<input type="text" readonly class="xcrud-input" name="' . $xcrud->fieldname_encode($fieldname) . '" value="' . $value . '" />';
}

function unset_val($postdata)
{
    $postdata->del('Paid');
}