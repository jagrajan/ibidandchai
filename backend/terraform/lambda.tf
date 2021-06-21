resource "aws_s3_bucket" "lambdas" {
  bucket = "${var.stack_name}-lambdas"
  acl    = "private"
  versioning {
    enabled = true
  }
}

resource "aws_lambda_function" "pre_token_generation" {
  function_name = "${var.stack_name}-pre-token-generation"
  handler       = "index.handler"
  role          = aws_iam_role.pre_token_generation.arn
  runtime       = "nodejs14.x"
  s3_bucket     = aws_s3_bucket.lambdas.bucket
  s3_key        = data.aws_s3_bucket_object.pre_token_generation.key

  depends_on = [
    aws_cloudwatch_log_group.pre_token_generation,
    aws_iam_role_policy_attachment.pre_token_generation_logging
  ]
}

resource "aws_iam_role" "pre_token_generation" {
  name               = "${var.stack_name}-pre-token-generation"
  assume_role_policy = data.aws_iam_policy_document.pre_token_generation.json
}

data "aws_s3_bucket_object" "pre_token_generation" {
  bucket = aws_s3_bucket.lambdas.bucket
  key    = "pre-token-generation.zip"
}

data "aws_iam_policy_document" "pre_token_generation" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
  }
}

resource "aws_cloudwatch_log_group" "pre_token_generation" {
  name              = "/aws/lambda/${var.stack_name}-pre-token-generation"
  retention_in_days = 14
}

resource "aws_iam_role_policy_attachment" "pre_token_generation_logging" {
  policy_arn =aws_iam_policy.pre_token_generation_logging.arn
  role = aws_iam_role.pre_token_generation.name
}

resource "aws_iam_policy" "pre_token_generation_logging" {
  policy = data.aws_iam_policy_document.pre_token_generation_logging.json
}

data "aws_iam_policy_document" "pre_token_generation_logging" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    effect = "Allow"
    resources = [
      "${aws_cloudwatch_log_group.pre_token_generation.arn}:*"
    ]
  }
}