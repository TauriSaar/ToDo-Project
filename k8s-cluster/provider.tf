terraform {
  required_providers {
    vultr = {
      source = "vultr/vultr"
      version = "2.17.1"
    }
  }
}

# Configure the Vultr Provider
provider "vultr" {
  api_key = ""
  rate_limit = 100
  retry_limit = 3
}