<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

abstract class Transformer extends TransformerAbstract
{
    public abstract function transform($post);
}