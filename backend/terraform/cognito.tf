resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.stack_name}-users"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
  device_configuration {
    device_only_remembered_on_user_prompt = false
  }

  lambda_config {
    pre_token_generation = aws_lambda_function.pre_token_generation.arn
  }

  tags = {
    Stack = var.stack_name
  }
}

resource "aws_lambda_permission" "user_pool_pre_token_generation" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pre_token_generation.function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.user_pool.arn
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = "${var.stack_name}-client"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  allowed_oauth_flows                  = ["implicit"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["email", "openid"]
  supported_identity_providers         = ["COGNITO", "Google"]

  callback_urls = ["http://localhost:3000/user/login"]
}

resource "aws_cognito_identity_provider" "google_identity_provider" {
  user_pool_id = aws_cognito_user_pool.user_pool.id

  provider_details = {
    authorize_scopes = "email"
    client_id        = var.google_client_id
    client_secret    = var.google_client_secret
  }
  provider_name = "Google"
  provider_type = "Google"

  attribute_mapping = {
    email    = "email"
    username = "sub"
  }
}

resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain          = "${var.cognito_subdomain}.${var.root_domain}"
  user_pool_id    = aws_cognito_user_pool.user_pool.id
  certificate_arn = aws_acm_certificate.twocats_auth.arn
}

data "aws_route53_zone" "twocats_auth" {
  name = var.root_domain
}

resource "aws_acm_certificate" "twocats_auth" {
  domain_name       = "${var.cognito_subdomain}.${var.root_domain}"
  validation_method = "DNS"
  provider          = aws.us-east-1
}

resource "aws_route53_record" "twocats_auth" {
  name    = "${var.cognito_subdomain}.${var.root_domain}"
  type    = "A"
  zone_id = data.aws_route53_zone.twocats_auth.zone_id

  alias {
    evaluate_target_health = false
    name                   = aws_cognito_user_pool_domain.user_pool_domain.cloudfront_distribution_arn
    zone_id                = "Z2FDTNDATAQYW2"
  }
}
